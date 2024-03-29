use axum::{
    routing::{delete, get, put},
    serve, Router,
};
use birthdays::{
    handlers::{delete_person, get_person, get_upcoming_birthdays, list_people, put_person},
    storage::PersonStorage,
};
use dotenvy::dotenv;
use std::{env, path::Path, sync::Arc};
use tokio::{
    net::TcpListener,
    signal::unix::{signal, SignalKind},
};
use tower_http::cors::{Any, CorsLayer};

mod birthdays;
mod error;

struct AppState {
    storage: PersonStorage,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let storage_path = Path::new(
        env::var("BIRTHDAY_STORAGE_FILE")
            .expect("'BIRTHDAY_STORAGE_FILE' to be set")
            .as_str(),
    )
    .to_path_buf();

    let state = Arc::new(AppState {
        storage: PersonStorage::new(storage_path),
    });

    let app = Router::new()
        .route("/person", get(list_people))
        .route("/person", put(put_person))
        .route("/person/:id", get(get_person))
        .route("/person/:id", delete(delete_person))
        .route("/birthday/upcoming", get(get_upcoming_birthdays))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .with_state(state);

    let listener = TcpListener::bind("0.0.0.0:5000")
        .await
        .expect("port 5000 to be listenable");

    serve(listener, app)
        .with_graceful_shutdown(graceful_shutdown())
        .await
        .expect("server to be startable");
}

async fn graceful_shutdown() {
    signal(SignalKind::terminate())
        .expect("signal handler to be installable")
        .recv()
        .await;
}
