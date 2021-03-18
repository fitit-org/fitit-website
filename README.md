# Fit IT website

## Cel projektu

Projekt został wykonany w celach edukacyjnych.\
Celem było utworzenie aplikacji dla nauczycieli wf-u do śledzenia postępów uczniów w ćwiczeniach podczas lekcji zdalnych

# Status projektu
Projekt można nazwać ukończonym prototypem. Wymaga wielu poprawek i refactoru, jednak jest w miarę użyteczny i przedstawia zamysł jaki chciał przekazać business owner


Wiodące technologie użyte w projekcie:
* React 17.0.1
* Typescript
* Redux-saga
* Sass

# Struktura folderów
Po sklonowaniu repozytorium struktura folderów powinna wyglądać następująco
```
fitit-website
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── manifest.json
│   ├── maskable_icon.png
│   ├── robots.txt
│   └── splash.png
├── README.md
├── src
│   ├── components
│   │   ├── ActivityComponents
│   │   │   ├── ActivityBubble.tsx
│   │   │   ├── ActivityHistory.tsx
│   │   │   ├── ActivitySaved.tsx
│   │   │   ├── ActivitySelect.tsx
│   │   │   ├── ActivityTypes.tsx
│   │   │   ├── CurrentActivity.tsx
│   │   │   ├── SaveActivity.tsx
│   │   │   └── StartActivity.tsx
│   │   ├── Dashboards
│   │   │   ├── TeacherPanel
│   │   │   │   ├── ActivityBubble.tsx
│   │   │   │   ├── ClassBubble.tsx
│   │   │   │   ├── CreateClass
│   │   │   │   │   ├── StepOne.tsx
│   │   │   │   │   └── StepTwo.tsx
│   │   │   │   ├── CreateClassModal.tsx
│   │   │   │   ├── MainView.tsx
│   │   │   │   └── SingleClassView.tsx
│   │   │   └── TheUserNav.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Login.tsx
│   │   ├── PanelFooter.tsx
│   │   ├── Register.tsx
│   │   ├── StudentRoute.tsx
│   │   └── TeacherRoute.tsx
│   ├── helpers
│   ├── img
│   │   ├── activities
│   │   ├── contact
│   │   ├── info
│   │   ├── login-register
│   │   ├── main-view
│   │   └── panels
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── services
│   │   └── APIService.ts
│   ├── serviceWorkerRegistration.ts
│   ├── service-worker.ts
│   ├── store
│   │   ├── modules
│   │   │   ├── classes
│   │   │   │   ├── actions.ts
│   │   │   │   ├── reducer.ts
│   │   │   │   ├── selectors.ts
│   │   │   │   ├── watchers.ts
│   │   │   │   └── workers.ts
│   │   │   ├── moduleRoot.ts
│   │   │   └── user
│   │   │       ├── actions.ts
│   │   │       ├── reducer.ts
│   │   │       ├── selectors.ts
│   │   │       ├── watchers.ts
│   │   │       └── workers.ts
│   │   ├── reducer.ts
│   │   └── store.ts
│   ├── styles
│   │   ├── animations.scss
│   │   ├── fonts.scss
│   │   ├── index.scss
│   │   ├── main.scss
│   │   ├── preflight.scss
│   │   ├── styles-Contact.scss
│   │   ├── styles-Info.scss
│   │   ├── styles-LoginRegister.scss
│   │   ├── styles-MainView.scss
│   │   ├── styles-StudentPanel.scss
│   │   ├── TeacherPanel
│   │   │   ├── ClassBubble.module.scss
│   │   │   ├── CreateClassModal.module.scss
│   │   │   └── TeacherPanel.module.scss
│   │   ├── TheUserNav.module.scss
│   │   └── variables.scss
│   ├── svg.d.ts
│   ├── types
│   │   ├── ActivityData.ts
│   │   ├── ActivityLog.ts
│   │   ├── ActivityType.ts
│   │   ├── Class.ts
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   │   ├── StoreTypes.ts
│   │   └── User.ts
│   ├── utils
│   │   ├── constants.ts
│   │   ├── helpers.tsx
│   │   └── validateEnv.ts
│   └── views
│       ├── Contact.tsx
│       ├── Info.tsx
│       ├── LoginRegister.tsx
│       ├── MainView.tsx
│       ├── StudentPanel.tsx
│       └── TeacherPanel.tsx
└── tsconfig.json
```
# Przygotowanie

Po pobraniu repozytorium należy zainstalować potrzebne moduły.\
Do tego kroku potrzebujesz `node` i `npm` zainstalowane na swojej maszynie.

Instalacja:
```
npm install
```
lub
```
npm ci
```

# Dostępne skrypty

### `npm start`

Uruchamia aplikację\
Otwiera aplikację pod adresem [http://localhost:3000](http://localhost:3000) w przeglądarce.

Strona automatycznie zostaje przeładowana przy wprowadzaniu zmian.

### `npm test`

Komenda na razie bezużyteczna\
Czeka na napisanie testów jednostkowych aplikacji

### `npm run build`

Buduje aplikację i przygotowuje do rozstawienia jej.\
Po wykonaniu skryptu pojawi się folder build/ znajduje się w nim aplikacja gotowa to implementacji na serwerze.

# .env

Jedyną zmienną w pliku .env jest `REACT_APP_API_URL` należy przypisać jej URL API z jakiego zamierzamy korzystać

# Folder public

Projekt korzysta z webpack. Wszystkie pliki w folderze public są dostępne tylko w jego obrębie, czyli na przykład do wykorzystania w pliku `index.html`

# Folder src

Projekt korzysta z webpack. Wszystkie pliki w folderze srd są dostępne tylko w jego obrębie. Ten folder dzieli się na różne podfoldery. Najważniejsze to:
* Components (zawiera wszystkie komponenty podzielone na pomniejsze foldery)
* Services (skrypty służące do komunikacji z API)
* Store (folder zawierający wszystkie konfiguracje i funkcjonalności Redux-Saga projektu)
* Styles (folder zawierający style scss. Głównym plikiem jest main.scss do którego importowane są pozostałe)
* Types (typy potrzebne do poprawnego korzystania z Typescript)
* Utils (skrypt, stałe itp. których używa się w kilku miejscach)
* Viwes (zawiera całe widoki składające się z pomniejszych komponentów)

# Typescript

Projekt został napisany przy użyciu Typescripta, tak też powinien być kontynuowany. Należy wystrzegać się używania `any` i `!`.

# Licencja

## MIT