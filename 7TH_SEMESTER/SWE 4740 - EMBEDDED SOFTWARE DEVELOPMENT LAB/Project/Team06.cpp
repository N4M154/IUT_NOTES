/*
SWE 4740 - Embedded Software Development
Team 06
210042111 - 210042112 - 210042114 - 210042131
*/

/*------------------------------------------------*/

/* Administration Dashboard */

//admin
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

// LEDs
const int LED_OK    = 7;
const int LED_TEMP  = 8;
const int LED_NIGHT = 9;
const int LED_CRIB  = 10;
const int LED_DOOR  = 6;

// Signal input pins
const int PIN_TEMP_SIGNAL  = A0;
const int PIN_LIGHT_SIGNAL = A2;
const int PIN_CRIB_SIGNAL  = A3;
const int PIN_DOOR_SIGNAL  = A4;  // receives signal from Door Security pin 2

// States
bool tempAlert = false;
bool nightMode = false;
bool cribAlert = false;
bool doorAlert = false;
int  temperature = 26;

bool doorOK = true;

// Previous states for logging
bool prevTempAlert = false;
bool prevNightMode = false;
bool prevCribAlert = false;
bool prevDoorAlert = false;

// Alert rotation
int alertCount = 0;
int alertIndex = 0;
int activeAlerts[4];

unsigned long lastAlertRotate = 0;
unsigned long lastRefresh     = 0;
bool blinkState = false;

// Door signal hold — keeps doorAlert true for 5s after signal goes LOW
unsigned long doorAlertHoldUntil = 0;
const unsigned long DOOR_HOLD_MS = 1000;

void setup() {
  Serial.begin(9600);
  Serial.println("=== DAYCARE SYSTEM STARTED ===");

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Daycare System");
  lcd.setCursor(0, 1);
  lcd.print("Starting...");
  delay(300);
  lcd.clear();

  pinMode(LED_OK,    OUTPUT);
  pinMode(LED_TEMP,  OUTPUT);
  pinMode(LED_NIGHT, OUTPUT);
  pinMode(LED_CRIB,  OUTPUT);
  pinMode(LED_DOOR,  OUTPUT);

  pinMode(PIN_TEMP_SIGNAL,  INPUT);
  pinMode(PIN_LIGHT_SIGNAL, INPUT);
  pinMode(PIN_CRIB_SIGNAL,  INPUT);
  pinMode(PIN_DOOR_SIGNAL,  INPUT);  // reads from Door Security pin 2

  Serial.println("All sensors connected. Monitoring started.");
  Serial.println("======================================");
}

void loop() {
  tempAlert = digitalRead(PIN_TEMP_SIGNAL);
  nightMode = digitalRead(PIN_LIGHT_SIGNAL);
  cribAlert = digitalRead(PIN_CRIB_SIGNAL);

  // If signal is HIGH, start/extend the hold timer
  if (digitalRead(PIN_DOOR_SIGNAL) == HIGH) {
    doorAlertHoldUntil = millis() + DOOR_HOLD_MS;
  }
  // Keep doorAlert true for DOOR_HOLD_MS after signal goes LOW
  doorAlert = (millis() < doorAlertHoldUntil);

  temperature = 0;

  doorOK = !doorAlert;

  // Log changes
  if (tempAlert && !prevTempAlert) logEvent("ALERT: High temperature detected!");
  if (!tempAlert && prevTempAlert) logEvent("INFO: Temperature back to normal");
  if (nightMode && !prevNightMode) logEvent("INFO: Night time - lights ON in zone");
  if (!nightMode && prevNightMode) logEvent("INFO: Day time - lights OFF");
  if (cribAlert && !prevCribAlert) logEvent("ALERT: Crib empty, motion detected - fall risk!");
  if (!cribAlert && prevCribAlert) logEvent("INFO: Crib situation resolved");
  if (doorAlert && !prevDoorAlert) logEvent("ALERT: Door security triggered!");
  if (!doorAlert && prevDoorAlert) logEvent("INFO: Door alert cleared");

  prevTempAlert = tempAlert;
  prevNightMode = nightMode;
  prevCribAlert = cribAlert;
  prevDoorAlert = doorAlert;

  if (millis() - lastAlertRotate >= 1500) {
    lastAlertRotate = millis();
    if (alertCount > 0)
      alertIndex = (alertIndex + 1) % alertCount;
  }

  if (millis() - lastRefresh >= 500) {
    lastRefresh = millis();
    blinkState = !blinkState;
    buildAlertList();
    updateLCD();
    updateLEDs();
  }
}

void buildAlertList() {
  alertCount = 0;
  if (tempAlert) activeAlerts[alertCount++] = 1;
  if (cribAlert) activeAlerts[alertCount++] = 2;
  if (doorAlert) activeAlerts[alertCount++] = 3;

  if (alertCount > 0 && alertIndex >= alertCount)
    alertIndex = 0;
}

void printAlertLine(int code) {
  if (code == 1) lcd.print("High Temp  ");
  else if (code == 2) lcd.print("Crib:Fall Risk! ");
  else if (code == 3) lcd.print("Door:NOT OK     ");
}

void updateLCD() {
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Temp:");
  lcd.print(tempAlert ? "HIGH " : "NORMAL ");
  lcd.print(nightMode ? "Night " : "Day   ");
  lcd.print(alertCount > 0 ? "!" : " ");

  lcd.setCursor(0, 1);

  if (alertCount == 0) {
    if (doorOK)
      lcd.print("Crib:OK Door:OK ");
    else
      lcd.print("Crib:OK Door:NO ");
  }
  else if (alertCount == 1) {
    printAlertLine(activeAlerts[0]);
  }
  else {
    lcd.print(alertIndex + 1);
    lcd.print("/");
    lcd.print(alertCount);
    lcd.print(":");

    if (activeAlerts[alertIndex] == 1) lcd.print("High Temp 35C");
    else if (activeAlerts[alertIndex] == 2) lcd.print("Crib FallRisk");
    else if (activeAlerts[alertIndex] == 3) lcd.print("Door NOT OK  ");
  }
}

void updateLEDs() {
  bool anyAlert = tempAlert || cribAlert || doorAlert;
  digitalWrite(LED_OK,    !anyAlert);
  digitalWrite(LED_TEMP,   tempAlert);
  digitalWrite(LED_NIGHT,  nightMode);
  digitalWrite(LED_CRIB,   cribAlert);
  digitalWrite(LED_DOOR,   doorAlert);
}

void logEvent(const char* msg) {
  unsigned long totalSeconds = millis() / 1000;
  int h = totalSeconds / 3600;
  int m = (totalSeconds % 3600) / 60;
  int s = totalSeconds % 60;

  Serial.print("[");
  if (h < 10) Serial.print("0");
  Serial.print(h); Serial.print(":");
  if (m < 10) Serial.print("0");
  Serial.print(m); Serial.print(":");
  if (s < 10) Serial.print("0");
  Serial.print(s);
  Serial.print("] ");
  Serial.println(msg);
}

/*------------------------------------------------*/


/* Access & Attendance */


//Attendance
//Slave

const int NUM_PEOPLE = 3;
String names[] = {"Alice", "Bob", "Carol"};
int buttons[] = {2, 4, 7};

bool isInside[] = {false, false, false};
bool lastState[] = {HIGH, HIGH, HIGH};
unsigned long lastPress[] = {0, 0, 0};

void setup() {
  Serial.begin(9600);

  for (int i = 0; i < NUM_PEOPLE; i++) {
    pinMode(buttons[i], INPUT_PULLUP);
  }
}

void loop() {
  for (int i = 0; i < NUM_PEOPLE; i++) {
    bool state = digitalRead(buttons[i]);

    if (state == LOW && lastState[i] == HIGH) {
      if (millis() - lastPress[i] > 300) {
        lastPress[i] = millis();

        isInside[i] = !isInside[i];

        String msg = names[i] + "|" + (isInside[i] ? "ENTRY" : "EXIT");

        Serial.println(msg);
      }
    }

    lastState[i] = state;
  }
}


//Attendance
//Master

#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int BUZZER = 8;
unsigned long startTime;

//  Store entry times for 3 people
unsigned long entryTime[3] = {0, 0, 0};

// Same order as sender
String names[] = {"Alice", "Bob", "Carol"};

// Get current system time
unsigned long getSeconds() {
  return (millis() - startTime) / 1000;
}

//  Format seconds → HH:MM:SS
String formatTime(unsigned long t) {
  int h = t / 3600;
  int m = (t % 3600) / 60;
  int s = t % 60;

  char buffer[9];
  sprintf(buffer, "%02d:%02d:%02d", h, m, s);
  return String(buffer);
}

void showIdle() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Attendance Sys");

  lcd.setCursor(0, 1);
  lcd.print("Time: ");
  lcd.print(formatTime(getSeconds()));
}

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);

  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, LOW);

  startTime = millis();

  showIdle();
}

//  Find index of person
int findPersonIndex(String name) {
  for (int i = 0; i < 3; i++) {
    if (name == names[i]) return i;
  }
  return -1;
}

void loop() {

  // Idle clock update
  if (!Serial.available()) {
    lcd.setCursor(6, 1);
    lcd.print(formatTime(getSeconds()));
    delay(20);
  }

  if (Serial.available()) {

    String msg = Serial.readStringUntil('\n');
    msg.trim();

    int sep = msg.indexOf('|');
    if (sep == -1) return;

    String name = msg.substring(0, sep);
    String status = msg.substring(sep + 1);

    int idx = findPersonIndex(name);
    if (idx == -1) return;

    unsigned long currentTime = getSeconds();

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(name);

    lcd.setCursor(0, 1);

    // ENTRY
    if (status == "ENTRY") {
      entryTime[idx] = currentTime;

      lcd.print("IN ");
      lcd.print(formatTime(currentTime));

      Serial.print(name);
      Serial.print(" | ENTRY | ");
      Serial.println(formatTime(currentTime));
    }

    // EXIT (calculate interval)
    else if (status == "EXIT") {
      unsigned long duration = currentTime - entryTime[idx];

      lcd.print("OUT ");
      lcd.print(formatTime(duration));

      Serial.print(name);
      Serial.print(" | EXIT |  ");
      Serial.print(formatTime(currentTime));
      Serial.print(" | Duration: ");
      Serial.println(formatTime(duration));
    }

    // Buzzer
    digitalWrite(BUZZER, HIGH);
    delay(10);
    digitalWrite(BUZZER, LOW);

    delay(15);
    showIdle();
  }
}
/*------------------------------------------------*/


/* Crib Monitoring */


//crib

int pirPin = 2;
int ledPin = 7;
int ldrPin = A0;
int signalPin = 3;

int lastMotionState = LOW;
unsigned long lastMotionTime = 0;
int emptyThreshold = 300;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(signalPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  Serial.begin(9600);
}

void loop() {
  int motion = digitalRead(pirPin);
  int ldrValue = analogRead(ldrPin);

  if (motion != lastMotionState) {
    lastMotionTime = millis();
    lastMotionState = motion;
  }


  bool cribEmpty = (ldrValue < emptyThreshold);
  bool motionDetected = (motion == HIGH);

  bool alertActive = motionDetected && cribEmpty;
  digitalWrite(signalPin, alertActive ? HIGH : LOW);


  if (millis() - lastMotionTime < 500) {
    return;
  }

  Serial.print("Potentiometer Value: ");
  Serial.print(ldrValue);
  Serial.print(" | Crib: ");
  Serial.println(cribEmpty ? "EMPTY" : "OCCUPIED");

  if (motionDetected && cribEmpty) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(signalPin, HIGH);
    Serial.println("ALERT: Motion detected but crib is EMPTY - possible fall!");
  }
  else if (motionDetected && !cribEmpty) {
    digitalWrite(ledPin, LOW);
    digitalWrite(signalPin, LOW);
    Serial.println("Normal: Baby in crib, movement detected.");
  }
  else if (!motionDetected && !cribEmpty) {
    digitalWrite(ledPin, LOW);
    Serial.println("Baby asleep, no motion.");
  }
  else {
    digitalWrite(ledPin, LOW);
    Serial.println("Crib empty, no motion.");
  }

  delay(500);
}
/*------------------------------------------------*/


/* Door Security */


//Door Security

#include <Keypad.h>

int buzzerPin = 8;
int ledPin    = 7;
int signalPin = 2;

const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {9, 10, 11, 12};
byte colPins[COLS] = {A0, A1, A2, A3};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String password = "4";
String input = "";
int wrongAttempts = 0;

bool alarmActive = false;
unsigned long alarmStart = 0;

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin,    OUTPUT);
  pinMode(signalPin, OUTPUT);  // ADDED

  digitalWrite(buzzerPin, LOW);
  digitalWrite(ledPin,    LOW);
  digitalWrite(signalPin, LOW);  // ADDED

  Serial.begin(9600);
  Serial.println("=================================");
  Serial.println(" KEY PAD ALARM SYSTEM STARTED ");
  Serial.println("=================================");
}

// ---------- ALARM ON ----------
void triggerAlarm() {
  alarmActive = true;
  alarmStart = millis();
  digitalWrite(buzzerPin, HIGH);
  digitalWrite(ledPin,    HIGH);
  digitalWrite(signalPin, HIGH);
  Serial.println(">>>ALARM TRIGGERED<<<");
  Serial.println("Buzzer: ON");
  Serial.println("LED: ON");
  Serial.println("Signal to Admin: HIGH");
  Serial.println("Duration: 1 second");
}

void stopAlarm() {
  alarmActive = false;
  digitalWrite(buzzerPin, LOW);
  digitalWrite(ledPin,    LOW);
  digitalWrite(signalPin, LOW);
  Serial.println(">>>ALARM STOPPED<<<");
  Serial.println("Buzzer: OFF");
  Serial.println("LED: OFF");
  Serial.println("Signal to Admin: LOW");
  Serial.println("System ready again");
}

void checkPassword() {
  Serial.println("---------------------------------");
  Serial.print("PASSWORD ENTERED: ");
  Serial.println(input);
  if (input == password) {
    Serial.println("RESULT: CORRECT PASSWORD");
    wrongAttempts = 0;
    Serial.println("Wrong attempt counter reset to 0");
  }
  else {
    wrongAttempts++;
    Serial.println(">>RESULT: WRONG PASSWORD<<<");
    Serial.print("Wrong Attempts = ");
    Serial.println(wrongAttempts);
    if (wrongAttempts >= 2) {
      Serial.println(">>2 WRONG ATTEMPTS REACHED<<<");
      triggerAlarm();
      wrongAttempts = 0;
      Serial.println("Counter reset after alarm trigger");
    }
  }
  Serial.println("---------------------------------");
  input = "";
}

// ---------- LOOP ----------
void loop() {
  // ===== KEY PRESS =====
  char key = keypad.getKey();
  if (key != NO_KEY) {
    Serial.print("KEY PRESSED: ");
    Serial.println(key);
    if (key == '#') {
      Serial.println("Submit key detected (#)");
      checkPassword();
    }
    else if (key == '*') {
      input = "";
      Serial.println("Input CLEARED (*)");
    }
    else {
      input += key;
      Serial.print("Current INPUT BUFFER: ");
      Serial.println(input);
    }
  }


  if (alarmActive) {
    unsigned long elapsed = millis() - alarmStart;
    Serial.print("ALARM ACTIVE | Time elapsed: ");
    Serial.print(elapsed / 1000);
    Serial.println(" sec");
    if (elapsed >= 100) {
      stopAlarm();
    }
  }
}

/*------------------------------------------------*/


/* Thermal Comfort & Ambient Lighting */


//Fan-Light

// === Pin Definitions ===
int triggerPin = 12;
int echoPin    = 13;
int tempPin    = A0;   // TMP36 temperature sensor
int ldrPin     = A1;   // Photoresistor (LDR) — move to A1 in wiring
int fanPin     = 3;    // Fan (PWM)
int ledPin     = 8;    // LED
int signalTemp  = 4;
int signalLight = 2;

// === Thresholds ===
float tempThreshold  = 30.0;  // °C — fan activates above this
int   lightThreshold = 500;   // LDR value — below = dark/nighttime

// === Shared Variables ===
long duration = 0;
int  cm       = 0;
int  inchDist = 0;  // renamed from 'inch' to avoid any keyword conflicts

void setup() {
  Serial.begin(9600);
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin,    INPUT);
  pinMode(signalTemp,  OUTPUT);
  pinMode(signalLight, OUTPUT);
  pinMode(fanPin,     OUTPUT);
  pinMode(ledPin,     OUTPUT);
}

void loop() {
  // --- Ultrasonic Sensor Reading (shared by both systems) ---
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  cm       = duration * 0.034 / 2;
  inchDist = duration * 0.0133 / 2;

  // --- Temperature Sensor (TMP36) ---
  int   sensorValue = analogRead(tempPin);
  float voltage     = sensorValue * (5.0 / 1023.0);
  float temperature = (voltage - 0.5) * 100;

  // --- Light Sensor (LDR) ---
  int ldrValue = analogRead(ldrPin);

  // --- Debug Output ---
  Serial.print("Distance (in): "); Serial.println(inchDist);
  Serial.print("Distance (cm): "); Serial.println(cm);
  Serial.print("Temperature:   "); Serial.println(temperature);
  Serial.print("LDR Value:     "); Serial.println(ldrValue);
  Serial.println("---");

  // --- Fan Control ---
  // Fan ON if object is within zone AND temperature exceeds threshold
  if (inchDist < 50 && temperature > tempThreshold) {
    int fanSpeed = map(temperature, 20, 40, 0, 255);
    fanSpeed = constrain(fanSpeed, 0, 255);
    analogWrite(fanPin, fanSpeed);
    digitalWrite(signalTemp, HIGH);
  } else {
    analogWrite(fanPin, 0);
    digitalWrite(signalTemp, LOW);
  }

  // --- LED Control ---
  // LED ON if object is within zone AND it is dark (nighttime)
  if (inchDist < 50 && ldrValue < lightThreshold) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(signalLight, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(signalLight, LOW);
  }

  //delay(500);
}
/*------------------------------------------------*/


/* Spatial Safety */


//Gas-Soil

#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

// --- Soil system ---
const int soilPin      = A1;
const int soilBuzzer   = 8;
const int soilSwitch   = 9;
const int dryThreshold = 400;

// --- Gas system (unchanged from original) ---
const int gasSensor  = A0;
const int gasBuzzer  = 7;
const int gasSwitch  = 6;

unsigned long lastLcdUpdate = 0;
const unsigned long LCD_INTERVAL = 500;

void setup() {
  pinMode(soilBuzzer, OUTPUT);
  pinMode(soilSwitch, INPUT);
  pinMode(gasBuzzer,  OUTPUT);
  pinMode(gasSwitch,  INPUT);

  digitalWrite(soilBuzzer, LOW);
  digitalWrite(gasBuzzer,  LOW);

  Serial.begin(9600);
  lcd.begin(16, 2);
  lcd.setCursor(0, 0); lcd.print("Soil: --        ");
  lcd.setCursor(0, 1); lcd.print("Gas:  --        ");
  Serial.println("Dual Monitor Ready");
}

void loop() {
  bool soilOn = digitalRead(soilSwitch) == HIGH;
  bool gasOn  = digitalRead(gasSwitch)  == HIGH;

  // --- Soil logic ---
  String soilMsg;
  if (!soilOn) {
    digitalWrite(soilBuzzer, LOW);
    soilMsg = "OFF     ";
    Serial.println("Soil: OFF");
  } else {
    int soilVal = analogRead(soilPin);
    Serial.print("Soil raw: ");
    Serial.println(soilVal);
    if (soilVal <= dryThreshold) {
      digitalWrite(soilBuzzer, HIGH);
      soilMsg = "DRY!    ";
    } else {
      digitalWrite(soilBuzzer, LOW);
      soilMsg = "OK      ";
    }
  }

  // --- Gas logic ---
  String gasMsg;
  if (!gasOn) {
    digitalWrite(gasBuzzer, LOW);
    gasMsg = "OFF     ";
    Serial.println("Gas: OFF");
  } else {
    int gasRaw   = analogRead(gasSensor);
    int gasLevel = map(gasRaw, 85, 377, 0, 250);
    Serial.print("Gas level: ");
    Serial.println(gasLevel);
    if (gasLevel > 100) {
      digitalWrite(gasBuzzer, HIGH);
      gasMsg = "DANGER! ";
    } else {
      digitalWrite(gasBuzzer, LOW);
      gasMsg = "Safe    ";
    }
  }

  // --- LCD update ---
  if (millis() - lastLcdUpdate >= LCD_INTERVAL) {
    lastLcdUpdate = millis();
    lcd.setCursor(0, 0); lcd.print("Soil: " + soilMsg);
    lcd.setCursor(0, 1); lcd.print("Gas:  " + gasMsg);
  }

  delay(100);
}
