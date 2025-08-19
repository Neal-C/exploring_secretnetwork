use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Storage};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct State {
    pub count: i32,
    pub owner: Addr,
}

pub fn config(storage: &'_ mut dyn Storage) -> Singleton<'_, State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read(storage: &'_ dyn Storage) -> ReadonlySingleton<'_, State> {
    singleton_read(storage, CONFIG_KEY)
}
