import React from 'react';

import {Dialog} from 'coral-ui';
import Button from 'coral-ui/components/Button';

import styles from './BanUserDialog.css';

import I18n from 'coral-framework/modules/i18n/i18n';
import translations from '../translations';
const lang = new I18n(translations);

const BanUserDialog = ({open, handleClose, onClickBanUser, user}) => {
  const userName = (typeof user === 'undefined') ? '' : user['userName'];
  const userId = (typeof user === 'undefined') ? '' : user['userId'];
  const commentId = (typeof user === 'undefined') ? '' : user['commentId'];

  return (
    <Dialog className={styles.dialog} open={open} onClose={() => handleClose()} onCancel={() => handleClose()} title={lang.t('bandialog.ban_user')}>
    <span className={styles.close} onClick={() => handleClose()}>×</span>
      <div>
        <div className={styles.header}>
          <h3>
            {lang.t('bandialog.ban_user')}
          </h3>
        </div>
        <div className={styles.separator}>
          <h4>
            {lang.t('bandialog.are_you_sure', userName)}
          </h4>
          <i>
            {lang.t('bandialog.note')}
          </i>
        </div>
        <div className={styles.buttons}>
          <Button cStyle="cancel" onClick={() => handleClose()} full>
            {lang.t('bandialog.cancel')}
          </Button>
          <Button cStyle="black" onClick={() => onClickBanUser(userId, commentId)} full>
            {lang.t('bandialog.yes_ban_user')}
          </Button>
        </div>
      </div>
  </Dialog>
  );
};

export default BanUserDialog;