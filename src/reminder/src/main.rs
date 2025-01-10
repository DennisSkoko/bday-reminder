use api::{get_people, Person};
use chrono::{Datelike, Local, NaiveDate};
use dotenvy::dotenv;
use notify::Notifier;

mod api;
mod notify;

fn has_birthday_today(person: &Person) -> bool {
    let today = Local::now();

    let birthdate: NaiveDate = person
        .birthdate
        .parse()
        .expect("Birthdate format to be valid");

    today.day() == birthdate.day() && today.month() == birthdate.month()
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let people = get_people()
        .await
        .expect("birthdays to be fetched from api");

    let birthdays: Vec<_> = people
        .iter()
        .filter(|person| has_birthday_today(person))
        .collect();

    if birthdays.len() > 0 {
        let notifier = Notifier::new();

        for birthday in birthdays {
            notifier.notify_about_birthday(birthday).await;
        }
    }
}
