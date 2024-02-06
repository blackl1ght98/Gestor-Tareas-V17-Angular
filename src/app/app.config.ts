import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  //Archivo de configuracion de la aplicacion NO TOCAR
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'tareas-66631',
          appId: '1:1009807285977:web:1b4e80d90f664f8304e8c8',
          storageBucket: 'tareas-66631.appspot.com',
          apiKey: 'AIzaSyCM28GGpsN-_W3d-YKWZFXquKzHUCBAwio',
          authDomain: 'tareas-66631.firebaseapp.com',
          messagingSenderId: '1009807285977',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
