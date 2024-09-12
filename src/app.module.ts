import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { HealthMetricsModule } from './health-metrics/health-metrics.module';
import { SymptomTrackingModule } from './symptom-tracking/symptom-tracking.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { AiPredictionsModule } from './ai-predictions/ai-predictions.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MedicationTrackingModule } from './medication-tracking/medication-tracking.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PatientSessionsModule } from './patient-session/patient-session.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'postgres',
      database: 'db_cies_symplex',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    HealthMetricsModule,
    SymptomTrackingModule,
    ActivityLogsModule,
    AiPredictionsModule,
    FeedbackModule,
    MedicationTrackingModule,
    NotificationsModule,
    PatientSessionsModule,
    UserPreferencesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
