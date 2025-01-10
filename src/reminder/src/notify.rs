use std::env;

use crate::api::Person;
use chrono::{Local, NaiveDate};
use reqwest::Client;

struct BirthdayMessage {
    title: String,
    message: String,
}

impl From<&Person> for BirthdayMessage {
    fn from(person: &Person) -> Self {
        let title = format!("{} fyller år idag", person.name);

        let message = format!(
            "{} fyller {} idag, glöm inte att gratta personen!",
            person.name,
            Local::now()
                .date_naive()
                .years_since(
                    person
                        .birthdate
                        .parse::<NaiveDate>()
                        .expect("Birthdate format to be valid")
                )
                .expect("Don't know")
        );

        BirthdayMessage { title, message }
    }
}

pub struct Notifier {
    http_client: Client,
    endpoint: String,
    token: String,
}

impl Notifier {
    pub fn new() -> Self {
        let endpoint =
            env::var("BIRTHDAY_NOTIFY_ENDPOINT").expect("BIRTHDAY_NOTIFY_ENDPOINT to be defined");
        let token =
            env::var("BIRTHDAY_NOTIFY_TOKEN").expect("BIRTHDAY_NOTIFY_TOKEN to be defined");

        Notifier {
            http_client: Client::new(),
            endpoint,
            token
        }
    }

    pub async fn notify_about_birthday(&self, person: &Person) {
        let birthday_message = BirthdayMessage::from(person);

        self.http_client
            .post(&self.endpoint)
            .body(birthday_message.message)
            .header("Title", birthday_message.title)
            .header("Authorization", format!("Bearer {}", self.token))
            .send()
            .await
            .expect("To send notification to server");
    }
}
