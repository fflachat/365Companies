/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from 'react';
import searchContext from '../../context/searchContext';
import styles from './CompanyCard.module.css';

export default function CompanyCard({ companyData }) {
  const { search, isLoading } = useContext(searchContext);

  useEffect(() => {}, [search, isLoading]);

  if (companyData) {
    return (
      <div className={styles.card_container}>
        <a href={companyData.websiteUrl} className={styles.img_container}>
          <img
            src={`${companyData.logoUrl}`}
            alt={`${search} logo`}
            className={styles.logo}
          />
        </a>

        <h2 className={styles.name}>
          <a href={companyData.websiteUrl}>{search}</a>
        </h2>
        <p className={styles.description}>
          {companyData.description}{' '}
          <a className={styles.websiteLink} href={companyData.websiteUrl}>
            Plus d&apos;informations...
          </a>
        </p>

        <h4 className={styles.infos}>
          Date de création :{' '}
          <span className={styles.data}>{companyData.creationDate}</span>
        </h4>
        <h4 className={styles.infos}>
          Secteur : <span className={styles.data}>{companyData.activity}</span>
        </h4>

        <h4 className={styles.infos}>
          Nombre de profil Linkedin :{' '}
          <span className={styles.data}>{companyData.nbProfile}</span>
        </h4>
        <h4 className={styles.infos}>
          Taille de la société :{' '}
          <span className={styles.data}>{companyData.companySize}</span>
        </h4>
        <h4 className={styles.infos}>
          SIREN : <span className={styles.data}>{companyData.siren}</span>
        </h4>
        <h4 className={styles.infos}>
          Adresse :{' '}
          <span
            className={styles.data}
          >{`${companyData.street}, ${companyData.city}, ${companyData.country}`}</span>
        </h4>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className={styles.loading}>
        <h2>Chargement des données de la société en cours...</h2>
        <img src="/loading.gif" alt="loading picture" />
      </div>
    );
  }
}
