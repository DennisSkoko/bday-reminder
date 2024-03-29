use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use std::error::Error;

pub struct AppError(Box<dyn Error>);

impl From<Box<dyn Error>> for AppError {
    fn from(value: Box<dyn Error>) -> Self {
        AppError(value)
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        eprintln!("Error occured when handing request, {}", &self.0);
        StatusCode::INTERNAL_SERVER_ERROR.into_response()
    }
}

pub type AppResult<R> = Result<R, AppError>;
