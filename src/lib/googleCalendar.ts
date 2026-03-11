const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const CALENDAR_ID = "primary";

let tokenClient: google.accounts.oauth2.TokenClient | null = null;
let accessToken: string | null = null;

export function isConfigured(): boolean {
  return !!CLIENT_ID;
}

export function loadGoogleScripts(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById("google-gsi")) {
      resolve();
      return;
    }

    let loaded = 0;
    const check = () => {
      loaded++;
      if (loaded === 2) resolve();
    };

    const gsiScript = document.createElement("script");
    gsiScript.id = "google-gsi";
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.onload = check;
    document.head.appendChild(gsiScript);

    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.onload = () => {
      gapi.load("client", async () => {
        await gapi.client.init({});
        await gapi.client.load("calendar", "v3");
        check();
      });
    };
    document.head.appendChild(gapiScript);
  });
}

export function initTokenClient(onSuccess: () => void): void {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      if (response.access_token) {
        accessToken = response.access_token;
        gapi.client.setToken({ access_token: response.access_token });
        onSuccess();
      }
    },
  });
}

export function requestAuth(): void {
  if (tokenClient) {
    tokenClient.requestAccessToken();
  }
}

export function isAuthenticated(): boolean {
  return !!accessToken;
}

export function signOut(): void {
  if (accessToken) {
    google.accounts.oauth2.revoke(accessToken, () => {});
    accessToken = null;
    gapi.client.setToken(null);
  }
}

type BookingEvent = {
  id: string;
  date: string;
  time: string;
  consultationType: string;
  name: string;
  petName: string;
  petSpecies: string;
  symptoms: string;
};

function toGoogleEvent(booking: BookingEvent) {
  const [h, m] = booking.time.split(":").map(Number);
  const startDate = new Date(`${booking.date}T${booking.time}:00`);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);

  const formatTime = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:00`;

  return {
    summary: `【${booking.consultationType}】${booking.petName}（${booking.name}）`,
    description: [
      `診察内容: ${booking.consultationType}`,
      `ペット: ${booking.petName}（${booking.petSpecies}）`,
      `飼い主: ${booking.name}`,
      booking.symptoms ? `症状: ${booking.symptoms}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    start: {
      dateTime: formatTime(startDate),
      timeZone: "Asia/Tokyo",
    },
    end: {
      dateTime: formatTime(endDate),
      timeZone: "Asia/Tokyo",
    },
    extendedProperties: {
      private: {
        bookingId: booking.id,
      },
    },
  };
}

export async function addToCalendar(booking: BookingEvent): Promise<string | null> {
  if (!accessToken) return null;
  try {
    const event = toGoogleEvent(booking);
    const response = await gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });
    return response.result.id || null;
  } catch (e) {
    console.error("Failed to add to Google Calendar:", e);
    return null;
  }
}

export async function updateCalendarEvent(
  googleEventId: string,
  booking: BookingEvent
): Promise<boolean> {
  if (!accessToken) return false;
  try {
    const event = toGoogleEvent(booking);
    await gapi.client.calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId: googleEventId,
      resource: event,
    });
    return true;
  } catch (e) {
    console.error("Failed to update Google Calendar event:", e);
    return false;
  }
}

export async function deleteCalendarEvent(googleEventId: string): Promise<boolean> {
  if (!accessToken) return false;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (gapi.client.calendar.events as any)["delete"]({
      calendarId: CALENDAR_ID,
      eventId: googleEventId,
    });
    return true;
  } catch (e) {
    console.error("Failed to delete Google Calendar event:", e);
    return false;
  }
}
