chcp 65001

@echo off

rem URLを入力してもらう

set URL="https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481"

rem //XMLに記入
echo ^<?xml version="1.0" encoding="UTF-16"?^>^<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task"^>^<RegistrationInfo^>^<URI^>\OpenmiHoYoLabLogin^</URI^>^</RegistrationInfo^>^<Settings^>^<DisallowStartIfOnBatteries^>true^</DisallowStartIfOnBatteries^>^<StopIfGoingOnBatteries^>true^</StopIfGoingOnBatteries^>^<MultipleInstancesPolicy^>IgnoreNew^</MultipleInstancesPolicy^>^<StartWhenAvailable^>true^</StartWhenAvailable^>^<IdleSettings^>^<Duration^>PT10M^</Duration^>^<WaitTimeout^>PT1H^</WaitTimeout^>^<StopOnIdleEnd^>true^</StopOnIdleEnd^>^<RestartOnIdle^>false^</RestartOnIdle^>^</IdleSettings^>^</Settings^>^<Triggers^>^<CalendarTrigger^>^<StartBoundary^>1999-11-30T01:00:00^</StartBoundary^>^<ScheduleByDay^>^<DaysInterval^>1^</DaysInterval^>^</ScheduleByDay^>^</CalendarTrigger^>^</Triggers^>^<Actions Context="Author"^>^<Exec^>^<Command^>cmd^</Command^>^<Arguments^>/c start "" "%URL:&=&amp;%"^</Arguments^>^</Exec^>^</Actions^>^</Task^> > LoginSetup.xml

rem タスクスケジューラに入力させる
SCHTASKS /Create /XML LoginSetup.xml /TN ""

rem XMLを削除
del LoginSetup.xml

pause