use super::storage::{Person, PersonInput};
use crate::{error::AppResult, AppState};
use axum::{
    extract::{self, Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use chrono::{Datelike, NaiveDate, Utc};
use std::sync::Arc;
use uuid::Uuid;

pub async fn list_people(State(app_state): State<Arc<AppState>>) -> AppResult<Json<Vec<Person>>> {
    Ok(Json(app_state.storage.list()?))
}

pub async fn get_person(
    State(app_state): State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> AppResult<Response> {
    Ok(match app_state.storage.get(&id)? {
        Some(person) => Json(person).into_response(),
        None => StatusCode::NOT_FOUND.into_response(),
    })
}

pub async fn delete_person(
    State(app_state): State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> AppResult<StatusCode> {
    app_state.storage.delete(&id)?;
    Ok(StatusCode::NO_CONTENT)
}

pub async fn put_person(
    State(app_state): State<Arc<AppState>>,
    extract::Json(person): extract::Json<PersonInput>,
) -> AppResult<Json<Person>> {
    Ok(Json(app_state.storage.put(person)?))
}

pub async fn get_upcoming_birthdays(
    State(app_state): State<Arc<AppState>>,
) -> AppResult<Json<Vec<Person>>> {
    let now = Utc::now().date_naive();

    let mut upcoming_birthdays: Vec<Person> = app_state
        .storage
        .list()?
        .into_iter()
        .filter_map(|person| {
            let mut birthday_date = NaiveDate::parse_from_str(&person.birthday, "%Y-%m-%d")
                .inspect_err(|error| {
                    eprintln!(
                        "failed to parse birthday ({}) for {}, {}",
                        &person.birthday, &person.name, &error
                    )
                })
                .ok()?
                .with_year(now.year())?;

            if birthday_date < now {
                birthday_date = birthday_date.with_year(now.year() + 1)?;
            }

            if birthday_date.signed_duration_since(now).num_days() > 30 {
                return None;
            }

            Some(person)
        })
        .collect();

    upcoming_birthdays.sort_by_key(|person| person.birthday.split_once("-").unwrap().1.to_owned());

    Ok(Json(upcoming_birthdays))
}
