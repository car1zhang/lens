// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{AppHandle, Manager, CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};


fn main() {
    let exit = CustomMenuItem::new("exit".to_string(), "exit");
    let tray_menu = SystemTrayMenu::new()
        .add_item(exit);
    let system_tray = SystemTray::new()
        .with_menu(tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_app, _argv, _cwd| {

        }))
        .setup(|app| { // manage focus window
            let unfocus_handle = app.handle();
            let _unfocus = app.listen_global("unfocus", move |_event| {
                let window = unfocus_handle.get_window("focus").unwrap();
                window.hide().unwrap();

                unfocus_handle.emit_all("reload", {}).unwrap();
            });

            let focus_handle = app.handle(); // todo figure out wtf this means
            let _focus = app.listen_global("focus", move |_event| {
                let window = focus_handle.get_window("focus").unwrap();
                window.show().unwrap();

                focus_handle.emit_all("reload", {}).unwrap();
            });

            Ok(())
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => { // exit app
                match id.as_str() {
                    "exit" => {
                        AppHandle::exit(&app, 0);
                    }
                    _ => {}
                }
            }
            SystemTrayEvent::LeftClick { .. } => { // show window on click
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.unminimize().unwrap();
                window.set_focus().unwrap();
            }
            _ => {}
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => { // hide main window
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
