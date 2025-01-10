use std::{env, error::Error};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Person {
    #[allow(dead_code)]
    pub id: String,
    pub name: String,
    #[serde(rename = "birthday")]
    pub birthdate: String,
}

pub async fn get_people() -> Result<Vec<Person>, Box<dyn Error>> {
    let endpoint = env::var("BIRTHDAY_ENDPOINT").expect("BIRTHDAY_ENDPOINT to be defined");
    Ok(reqwest::get(format!("{endpoint}/person")).await?.json().await?)
}
