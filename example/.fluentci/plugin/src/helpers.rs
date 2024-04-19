use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_sonar() -> Result<String, Error> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "sonar-scanner"])?
        .stdout()?;
    Ok(stdout)
}
