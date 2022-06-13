const scrapCompanyData = require('../../../server/lib/getCompanyData');

const getCompanyData = async (company) => {
  try {
    const result = await scrapCompanyData(company);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { company } = req.query;
    const result = await getCompanyData(company);
    return res.json(result);
  }
}
