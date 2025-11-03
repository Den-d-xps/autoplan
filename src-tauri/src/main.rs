// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{AppHandle, Emitter};
use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader};
use serde_json::Value;

#[tauri::command]
async fn login() -> Result<String, String> {
    println!("🚀 Запуск");
    let output = Command::new("node")
        .arg("../automation/dist/scripts/login_and_save_auth.js")
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok("✅ Логин выполнен и auth.json сохранён".into())
    } else {
        let err = String::from_utf8_lossy(&output.stderr).to_string();
        Err(format!("Ошибка при логине: {}", err))
    }
}

#[tauri::command]
async fn check_auth() -> Result<bool, String> {
    let output = Command::new("node")
        .arg("../automation/dist/scripts/check_auth.js")
        .output()
        .map_err(|e| e.to_string())?;

    Ok(output.status.success())
}

#[tauri::command]
async fn set_light_macros(app: AppHandle, movie_name: String, time_value: Value, cinema_number: String) -> Result<String, String> {
    let script_path = "../automation/dist/scripts/instal_light_macros.js";
    println!("🚀 Запуск: {:?}", script_path);
    // Запускаем Node.js процесс с playwright
    let time_value_str = time_value.to_string();
    let mut child = Command::new("node")
        .arg(script_path)
        .arg(&movie_name)
        .arg(&time_value_str)
        .arg(&cinema_number)
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;

    let stdout = child.stdout.take().unwrap();
    let reader = BufReader::new(stdout);

    // Читаем строки stdout по мере появления
    for line in reader.lines() {
        if let Ok(msg) = line {
            // Шлём фронту событие
            app.emit("macro-progress", msg.clone())
                .map_err(|e| e.to_string())?;
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
