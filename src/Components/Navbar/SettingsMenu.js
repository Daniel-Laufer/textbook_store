import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./SettingsMenu.css";
import { Form } from "react-bootstrap";
import { updateSettings } from "../../Redux/Actions/settingsActions";
import { NonceProvider } from "react-select";
let SettingsMenu = ({ setSettingsMenuOpen, settings, updateSettings }) => {
  useEffect(() => {
    document.getElementById("root").addEventListener("click", (e) => {
      // if(e.target.)
      const ignore = [
        "settings-menu-container",
        "form-check-label",
        "form-check-input",
        "form-check",
        "fas fa-cog",
        "settings-button btn btn-primary"
        
      ];
      if (e.target.className && !ignore.includes(e.target.className)) {
        setSettingsMenuOpen(false);
      }
    });
  }, []);

  const handleChecked = (type) => {
    let newSettings;
    switch (type) {
      case "compact":
        newSettings = settings.settings;
        newSettings.compactCards = !newSettings.compactCards;
        return updateSettings(newSettings);
      case "dark":
        newSettings = settings.settings;
        newSettings.darkTheme = !newSettings.darkTheme;
        return updateSettings(newSettings);
      default:
        return null;
    }
  };

  return (
    <>
      <div className="settings-menu-container">
        {/* <div className="settings-menu-point"></div> */}
        Settings
        <Form>
          <div key={`default-checkbox`} className="mb-3">
            <Form.Check
              checked={settings.settings.compactCards}
              onClick={() => handleChecked("compact")}
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Compact Card View`}
            />
            <Form.Check
              checked={settings.settings.darkTheme}
              onClick={() => handleChecked("dark")}
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Dark Theme`}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settingsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSettings: (newSettings) => dispatch(updateSettings(newSettings)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);
