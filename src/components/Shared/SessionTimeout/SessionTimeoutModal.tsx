import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
import { AuthContext } from "../../../context/AuthContext";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import { SessionExpiryInfo } from "../../../types/AuthTypes";
import { ContentContext } from "../../../context/ContentContext";

function SessionTimeoutModal() {
  const { content } = useContext(ContentContext);
  const lastActivityStorageKey = "lastActivityAt";
  let lastActivityDateTime: Date = new Date();
  const showWarningAfterSecs = 5 * 60;
  const expireSessionAfterSecs = 10 * 60;

  const checkIntervalMs = 30 * 1000;

  const { getSessionExpiry, logOutToken } = useContext(AuthContext);

  const [sessionState, setSessionState] = useState({
    expiryInfo: new SessionExpiryInfo(undefined),
    secondsSinceLastActivity: 0,
  });

  const [showSessionTimeoutWarning, setShowSessionTimeoutWarning] = useState(false);

  const history = useHistory();

  const timeoutDialogRef = useRef<HTMLDialogElement>(null);

  const checkSessionRemainingTime = () => {
    const sessionExpiryInfo = getSessionExpiry();
    const now = new Date();

    const secondsSinceLastActivity = Math.ceil((now.getTime() - lastActivityDateTime.getTime()) / 1000);

    // eslint-disable-next-line no-console
    console.debug(`checkSessionRemainingTime: ${now.toISOString()}`);
    // eslint-disable-next-line no-console
    console.debug(`secondsSinceLastActivity: ${secondsSinceLastActivity}`);

    setSessionState({
      expiryInfo: sessionExpiryInfo,
      secondsSinceLastActivity,
    });

    // Notify other tabs of activity via local storage
    window.localStorage.setItem(lastActivityStorageKey, lastActivityDateTime.toISOString());
  };

  const resetWarning = () => {
    // eslint-disable-next-line no-console
    console.debug(`resetWarning`);
    lastActivityDateTime = new Date();
    setSessionState((s) => ({
      ...s,
      secondsSinceLastActivity: 0,
    }));
  };

  const closeModal = () => {
    setShowSessionTimeoutWarning(false);
  };

  useEffect(() => {
    timeoutDialogRef.current?.addEventListener("close", resetWarning);

    checkSessionRemainingTime();

    const interval = setInterval(checkSessionRemainingTime, checkIntervalMs);

    function detectedUserActivity() {
      let showWarning = false;
      setShowSessionTimeoutWarning((s) => {
        showWarning = s;
        return s;
      });

      if (!showWarning) {
        lastActivityDateTime = new Date();
      }
    }

    function detectUserActivityAcrossTabs(event: StorageEvent) {
      if (event.storageArea !== localStorage) return;
      if (event.key === lastActivityStorageKey) {
        if (event.newValue) {
          const notifiedActivityDate = new Date(event.newValue);
          if (notifiedActivityDate.getTime() > lastActivityDateTime.getTime()) {
            lastActivityDateTime = notifiedActivityDate;
          }
        }
      }
    }

    // An array of DOM events that should be interpreted as
    // user activity.
    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

    // add these events to the document.
    // register the activity function as the listener parameter.
    activityEvents.forEach((eventName) => {
      document.addEventListener(eventName, detectedUserActivity, true);
    });

    window.addEventListener("storage", detectUserActivityAcrossTabs);

    return () => {
      activityEvents.forEach((eventName) => {
        document.removeEventListener(eventName, detectedUserActivity);
      });

      timeoutDialogRef.current?.removeEventListener("close", resetWarning);

      clearInterval(interval);

      window.removeEventListener("storage", detectUserActivityAcrossTabs);
    };
  }, []);

  useEffect(() => {
    const timeoutDialog = timeoutDialogRef.current as HTMLDialogElement;

    if (showSessionTimeoutWarning) {
      if (!timeoutDialog.open) {
        timeoutDialog.showModal();
      }
    } else if (timeoutDialog.close) {
      timeoutDialog.close();
    }
  }, [showSessionTimeoutWarning]);

  useEffect(() => {
    checkShowWarning();

    checkShouldLogout();

    function checkShouldLogout() {
      if (sessionState.expiryInfo.isLoggedIn && sessionState.secondsSinceLastActivity >= expireSessionAfterSecs) {
        logOutToken();
        history.push(`/SessionExpired`);
        setShowSessionTimeoutWarning(false);
      }
    }

    function checkShowWarning() {
      if (sessionState.expiryInfo.isLoggedIn) {
        setShowSessionTimeoutWarning(sessionState.secondsSinceLastActivity >= showWarningAfterSecs);
      }
    }
  }, [sessionState]);

  return (
    <dialog
      className="govuk-timeout-warning dialog"
      data-module="govuk-timeout-warning"
      id="js-timeout-warning"
      aria-live="polite"
      aria-labelledby="dialog-title"
      aria-describedby="at-timer"
      ref={timeoutDialogRef}
    >
      <DTEHeaderCaption contentKey="session-warning-modal-header-caption" />
      {sessionState.expiryInfo.duration - sessionState.secondsSinceLastActivity > 0 && (
        <DTEHeader as="h1" id="dialog-title">
          {content["session-warning-modal-header"]} <br />
          {moment
            .duration(sessionState.expiryInfo.duration - sessionState.secondsSinceLastActivity, "seconds")
            .humanize(true)}
        </DTEHeader>
      )}
      {sessionState.expiryInfo.duration - sessionState.secondsSinceLastActivity <= 0 && (
        <DTEHeader as="h1" id="dialog-title">
          {content["session-warning-modal-header"]} {content["reusable-text-soon"]}
        </DTEHeader>
      )}
      <div className="govuk-body">{content["session-warning-modal-body"]}</div>
      <DTEButton onClick={closeModal}>{content["reusable-button-continue"]}</DTEButton>
    </dialog>
  );
}

export default SessionTimeoutModal;
