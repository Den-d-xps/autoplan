// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// fn main() {
//   app_lib::run();
// }


use std::process::Command;

#[tauri::command]
fn launch_login_browser() {
    // запускаем Node.js скрипт для логина и сохранения auth.json
    let _ = Command::new("node")
        .arg("../automation/dist/login_and_save_auth.js") // компилированный JS
        .spawn()
        .expect("Не удалось запустить Playwright скрипт");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_login_browser])
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}
