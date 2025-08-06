 Todo Task Management App

A cross-platform mobile app built using Flutter for the Katomaran Hackathon. It allows users to manage personal tasks with full CRUD operations and Google login.

 Features

- Google Authentication
- Create, Read, Update, Delete Tasks
- Mark tasks as complete/incomplete
- Fields: Title, Description, Due Date, Status, Priority
- Search, Filters, Swipe-to-delete, Pull-to-refresh
- Floating Action Button (FAB) for adding tasks
- Firebase Crashlytics integration

 Tech Stack

- Flutter & Dart  
- Firebase Authentication  
- Firebase Crashlytics  
- Figma (for UI design reference)

 Architecture

Follows MVVM (Model-View-ViewModel) design pattern with modular and scalable folder structure.

 Assumptions

- Only Google Sign-In is implemented  
- Tasks are stored locally within the session  
- Priority is shown visually but not used for sorting  
- The UI design is based on Figma references

  Setup

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
flutter pub get
flutter run
his project is a part of a hackathon run by https://www.katomaran.com

