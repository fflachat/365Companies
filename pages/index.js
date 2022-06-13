import axios from 'axios';
import { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard/CompanyCard';
import Layout from '../components/Layout/Layout';
import SearchBar from '../components/SearchBar/SearchBar';
import searchContext from '../context/searchContext';

const companyDataExample = {
  description:
    'Lorem ipsum dolor sit amet. Cumque voluptas sit inventore minus ea esse repellat est quae voluptatum eum molestiae officia ut voluptates dignissimos vel distinctio reiciendis. Ut animi doloribus est reprehenderit repellat sed explicabo quia rem galisum exercitationem.',
  logoUrl: 'https://loremflickr.com/640/360',
  nbProfile: '1',
  websiteUrl: 'www.google.com',
  companySize: '1',
  siren: '1',
  street: '40 rue du test',
  city: 'Lyon',
  country: 'France',
  creationDate: '2015',
  activity: '',
};

export default function Home() {
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState();

  const fetchData = async (s) => {
    await axios
      .get(`/api/company/${s}`)
      .then((res) => setCompanyData(res.data))
      .finally(() => setIsLoading(false));
    console.log('data test', companyData);
  };

  useEffect(() => {
    if (isLoading) {
      fetchData(search);
    }
  }, [isLoading, search, companyData]);

  return (
    <searchContext.Provider
      value={{ search, setSearch, isLoading, setIsLoading, setCompanyData }}
    >
      <Layout pageTitle={'365Companies'}>
        <SearchBar />
        <CompanyCard companyData={companyData} />
      </Layout>
    </searchContext.Provider>
  );
}
