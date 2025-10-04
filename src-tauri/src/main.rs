// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::Command;

#[tauri::command]
async fn login() -> Result<String, String> {
    let output = Command::new("node")
        .arg("../automation/dist/login_and_save_auth.js")
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
        .arg("../automation/dist/check_auth.js")
        .output()
        .map_err(|e| e.to_string())?;

    Ok(output.status.success())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, check_auth])
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}
