// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{AppHandle, Emitter};
use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader};
use serde_json::Value;
use std::path::PathBuf;

fn get_node_path() -> PathBuf {
    let exe_dir = std::env::current_exe().unwrap().parent().unwrap().to_path_buf();
    exe_dir.join("_up_").join("automation").join("dist").join("node.exe")
}

fn automation_script(script_name: &str) -> Result<PathBuf, String> {
    let exe_dir = std::env::current_exe()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("Failed to get exe dir")?
        .to_path_buf();

    let script_path = exe_dir
        .join("_up_")
        .join("automation")
        .join("dist")
        .join("scripts")
        .join(script_name);

    if !script_path.exists() {
        return Err(format!("Script not found: {:?}", script_path));
    }

    Ok(script_path)
}

#[tauri::command]
async fn login() -> Result<String, String> {
    use std::env;
    use std::path::PathBuf;

    println!("========== LOGIN START ==========");

    let exe = env::current_exe().map_err(|e| e.to_string())?;
    println!("current_exe: {:?}", exe);

    let exe_dir = exe.parent().ok_or("No exe parent")?;
    println!("exe_dir: {:?}", exe_dir);

    let node_path = get_node_path();
    println!("node_path: {:?}", node_path);
    println!("node exists: {}", node_path.exists());

    let script_path = automation_script("login_and_save_auth.js")?;

    println!("script_path: {:?}", script_path);
    println!("script exists: {}", script_path.exists());

    let output = Command::new(&node_path)
        .arg(&script_path)
        .env("NODE_ENV", "production")
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
        Ok("login ok".into())
    } else {
        Err("login failed".into())
    }
}

#[tauri::command]
async fn check_auth() -> Result<bool, String> {
    let script = automation_script("check_auth.js")?;
    let output = Command::new(get_node_path())
        .arg(script)
        .output()
        .map_err(|e| e.to_string())?;

    Ok(output.status.success())
}

#[tauri::command]
async fn set_light_macros(app: AppHandle, movie_name: String, time_value: Value, cinema_number: String, position: String, id: String) -> Result<String, String> {
    println!("🚀 Запуск");
    let script_path = automation_script("instal_light_macros.js")?;
    let time_value_str = time_value.to_string();
    let mut child = Command::new(get_node_path())
        .arg(&script_path)
        .arg(&movie_name)
        .arg(&time_value_str)
        .arg(&cinema_number)
        .arg(&position)
        .arg(&id)
        .stdout(Stdio::piped())
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, check_auth, set_light_macros])
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}
