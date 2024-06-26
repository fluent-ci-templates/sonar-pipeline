use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_sonar;

pub mod helpers;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    let stdout = setup_sonar()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn analyze(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec![
            "pkgx",
            "+sonarqube.org/sonarscanner",
            "sonar-scanner",
            "-Dsonar.organization=$SONAR_ORGANIZATION",
            "-Dsonar.projectKey=$SONAR_PROJECT_KEY",
            "-Dsonar.sources=$SONAR_SOURCES",
            "-Dsonar.host.url=$SONAR_HOST_URL",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
