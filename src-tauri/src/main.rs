// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{AppHandle, Emitter};
use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader};
use serde_json::Value;
use std::path::PathBuf;
use std::os::windows::process::CommandExt;


fn resolve_runtime_paths() -> Result<(PathBuf, PathBuf, PathBuf, PathBuf), String> {
    let current_dir = std::env::current_exe()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("Failed to get exe dir")?
        .to_path_buf();

    let browser_dir = current_dir.join("chromium");
    let node_path = current_dir.join("node.exe");
    let script_dir = current_dir.join("scripts");

    Ok((current_dir, browser_dir, node_path, script_dir))
}


#[tauri::command]
async fn login() -> Result<String, String> {
    // use std::env;
    // use std::path::PathBuf;
    let (current_dir, browser_dir, node_path, script_dir) = resolve_runtime_paths()?;

    println!("🚀 Запуск login");
    println!("========== LOGIN START ==========");
    println!("current_exe: {:?}", current_dir);
    println!("browser_dir: {:?}", browser_dir);
    println!("node_path: {:?}", node_path);
    println!("node exists: {}", node_path.exists());
    println!("script_dir: {:?}", script_dir);
    println!("script exists: {}", script_dir.exists());

    let script_path = script_dir.join("login_and_save_auth.js");
    println!("script_path: {:?}", script_path);
    println!("script exists: {}", script_path.exists());

    let output = Command::new(&node_path)
        .current_dir(&current_dir)
        .arg(&script_path)
        .env("NODE_ENV", "production")
        .env(
            "PLAYWRIGHT_BROWSERS_PATH", 
            &browser_dir,
        )
        .creation_flags(0x08000000)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output()
        .map_err(|e| format!("Failed to start node: {e}"))?;

    println!("--- NODE STDOUT ---");
    println!("{}", String::from_utf8_lossy(&output.stdout));

    println!("--- NODE STDERR ---");
    println!("{}", String::from_utf8_lossy(&output.stderr));

    println!("exit status: {:?}", output.status.code());

    if output.status.success() {
        println!("login ok");
        Ok("login ok".into())
    } else {
        println!("login failed");
        Err("login failed".into())
    }
}

#[tauri::command]
async fn check_auth() -> Result<bool, String> {
    println!("🚀 Запуск check_auth");
    let (current_dir, browser_dir, node_path, script_dir) = resolve_runtime_paths()?;
    let script_path = script_dir.join("check_auth.js");

    let output = Command::new(&node_path)
        .current_dir(&current_dir)
        .arg(&script_path)
        .env("NODE_ENV", "production")
        .env(
            "PLAYWRIGHT_BROWSERS_PATH", 
            &browser_dir,
        )
        .creation_flags(0x08000000)
        .output()
        .map_err(|e| e.to_string())?;

    Ok(output.status.success())
}

#[tauri::command]
async fn set_light_macros(app: AppHandle, movie_name: String, time_value: Value, cinema_number: String, position: String, id: String) -> Result<String, String> {
    println!("🚀 Запуск set_light_macros");

    let (current_dir, browser_dir, node_path, script_dir) = resolve_runtime_paths()?;
    let script_path = script_dir.join("instal_light_macros.js");

    let time_value_str = time_value.to_string();
    let mut child = Command::new(&node_path)
        .current_dir(&current_dir)
        .arg(&script_path)
        .env("NODE_ENV", "production")
        .env(
            "PLAYWRIGHT_BROWSERS_PATH", 
            &browser_dir,
        )
        .arg(&movie_name)
        .arg(&time_value_str)
        .arg(&cinema_number)
        .arg(&position)
        .arg(&id)
        .stdout(Stdio::piped())
        .creation_flags(0x08000000)
        .spawn()
        .map_err(|e| e.to_string())?;

    let stdout = child.stdout.take().unwrap();
    let reader = BufReader::new(stdout);

    // Читаем строки stdout по мере появления
    for line in reader.lines() {
        if let Ok(msg) = line {
            if let Ok(json) = serde_json::from_str::<Value>(&msg) {
                app.emit("macro-progress", json).ok();
            } else {
                app.emit("macro-progress", serde_json::json!({
                    "progress": null,
                    "message": msg
                })).ok();
            }
        }
    }

    let status = child.wait().map_err(|e| e.to_string())?;
    if status.success() {
        Ok("✅ Макрос завершён".into())
    } else {
        Err("❌ Ошибка выполнения макроса".into())
    }
}

#[tauri::command]
async fn get_theaters(app: AppHandle) -> Result<String, String> {
    println!("🚀 Запуск get_theaters");
    let (current_dir, browser_dir, node_path, script_dir) = resolve_runtime_paths()?;
    let script_path = script_dir.join("add_theaters.js");

    let mut child = Command::new(&node_path)
        .current_dir(&current_dir)
        .arg(&script_path)
        .env("NODE_ENV", "production")
        .env(
            "PLAYWRIGHT_BROWSERS_PATH", 
            &browser_dir,
        )
        .stdout(Stdio::piped())
        .creation_flags(0x08000000)
        .spawn()
        .map_err(|e| e.to_string())?;

    let stdout = child.stdout.take().unwrap();
    let reader = BufReader::new(stdout);

    // Читаем строки stdout по мере появления
    for line in reader.lines() {
        if let Ok(msg) = line {
            if let Ok(json) = serde_json::from_str::<Value>(&msg) {
                println!("ок");
                if json.get("type") == Some(&Value::String("theaters".into())) {
                    app.emit("theaters_list", json["payload"].clone()).ok();
                }
            } else {
                println!("не ок");
                // app.emit("theaters_list", serde_json::json!([])).ok();
            }
        }
    }

    let status = child.wait().map_err(|e| e.to_string())?;
    if status.success() {
        println!("ок");
        println!("конец");
        Ok("✅ Макрос завершён".into())
    } else {
        println!("не ок");
        println!("конец");
        Err("❌ Ошибка выполнения макроса".into())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, check_auth, set_light_macros, get_theaters])
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}
