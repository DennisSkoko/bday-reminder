use serde::{Deserialize, Serialize};
use std::{
    collections::BTreeMap,
    error::Error,
    fs::File,
    io::{BufReader, BufWriter, Write},
    path::PathBuf,
};
use uuid::Uuid;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Person {
    pub id: Uuid,
    pub name: String,
    pub birthday: String,
}

impl From<PersonInput> for Person {
    fn from(value: PersonInput) -> Self {
        Self {
            id: value.id.unwrap_or_else(|| Uuid::new_v4()),
            name: value.name,
            birthday: value.birthday,
        }
    }
}

#[derive(Deserialize)]
pub struct PersonInput {
    id: Option<Uuid>,
    name: String,
    birthday: String,
}

pub struct PersonStorage {
    storage_path: PathBuf,
}

impl PersonStorage {
    pub fn new(storage_path: PathBuf) -> Self {
        Self { storage_path }
    }

    fn read(&self) -> Result<BTreeMap<Uuid, Person>, Box<dyn Error>> {
        let file = File::open(&self.storage_path)?;
        let reader = BufReader::new(file);
        let data: BTreeMap<Uuid, Person> = serde_json::from_reader(reader)?;

        Ok(data)
    }

    fn write(&self, data: BTreeMap<Uuid, Person>) -> Result<(), Box<dyn Error>> {
        let file = File::create(&self.storage_path)?;
        let mut writer = BufWriter::new(file);

        if cfg!(debug_assertions) {
            serde_json::to_writer_pretty(&mut writer, &data)?;
        } else {
            serde_json::to_writer(&mut writer, &data)?;
        }

        writer.flush()?;
        Ok(())
    }

    pub fn list(&self) -> Result<Vec<Person>, Box<dyn Error>> {
        Ok(self.read()?.into_values().collect())
    }

    pub fn get(&self, id: &Uuid) -> Result<Option<Person>, Box<dyn Error>> {
        Ok(self.read()?.remove(id))
    }

    pub fn put(&self, person: PersonInput) -> Result<Person, Box<dyn Error>> {
        let mut data = self.read()?;
        let person = Person::from(person);

        data.insert(person.id.clone(), person.clone());
        self.write(data)?;

        Ok(person)
    }

    pub fn delete(&self, id: &Uuid) -> Result<(), Box<dyn Error>> {
        let mut data = self.read()?;

        data.remove(id);
        self.write(data)?;

        Ok(())
    }
}
