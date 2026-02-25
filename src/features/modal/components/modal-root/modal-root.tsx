import { ModalLayout } from "../modal-layout/modal-layout";
import { InfoPage, SettingsPage } from "@/pages";
import { LogoutConfirm } from "@feat/auth";

export const ModalsRoot = () => {

  return (
    <>
      <ModalLayout
        id='settings'
        title='Настройки'
      >
        <SettingsPage />
      </ModalLayout>
      <ModalLayout
        id='info'
        title='О программе'
      >
        <InfoPage />
      </ModalLayout>
      <ModalLayout
        id='logout-confirm'
        title='Выход'
      >
        <LogoutConfirm />
      </ModalLayout>
    </>
  );
};