import { Select, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCity, setDateFilterForecast } from "../Store";
export default function Filters() {
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const cities = [
      "Islamabad, Pakistan",
      "Karachi, Pakistan",
      "Lahore, Pakistan",
      "Rawalpindi, Pakistan",
      "Faisalabad, Pakistan",
      "Multan, Pakistan",
      "Peshawar, Pakistan",
      "Quetta, Pakistan",
      "Sialkot, Pakistan",
      "Gujranwala, Pakistan",
      "Sargodha, Pakistan",
      "Bahawalpur, Pakistan",
      "Sukkur, Pakistan",
      "Larkana, Pakistan",
      "Sheikhupura, Pakistan",
      "Jhang, Pakistan",
      "Sahiwal, Pakistan",
      "Okara, Pakistan",
      "Dera Ghazi Khan, Pakistan",
      "Mirpur Khas, Pakistan",
      "New York City, United States",
      "Los Angeles, United States",
      "Chicago, United States",
      "Houston, United States",
      "Philadelphia, United States",
      "Toronto, Canada",
      "Montreal, Canada",
      "Vancouver, Canada",
      "Calgary, Canada",
      "Ottawa, Canada",
      "Mexico City, Mexico",
      "Guadalajara, Mexico",
      "Monterrey, Mexico",
      "São Paulo, Brazil",
      "Rio de Janeiro, Brazil",
      "Brasília, Brazil",
      "Belo Horizonte, Brazil",
      "Porto Alegre, Brazil",
      "Buenos Aires, Argentina",
      "Córdoba, Argentina",
      "Rosario, Argentina",
      "Santiago, Chile",
      "Valparaíso, Chile",
      "London, United Kingdom",
      "Manchester, United Kingdom",
      "Birmingham, United Kingdom",
      "Berlin, Germany",
      "Munich, Germany",
      "Frankfurt, Germany",
      "Paris, France",
      "Marseille, France",
      "Lyon, France",
      "Rome, Italy",
      "Milan, Italy",
      "Naples, Italy",
      "Madrid, Spain",
      "Barcelona, Spain",
      "Valencia, Spain",
      "Moscow, Russia",
      "Saint Petersburg, Russia",
      "Beijing, China",
      "Shanghai, China",
      "Guangzhou, China",
      "Shenzhen, China",
      "Chengdu, China",
      "Mumbai, India",
      "New Delhi, India",
      "Bangalore, India",
      "Kolkata, India",
      "Chennai, India",
      "Tokyo, Japan",
      "Osaka, Japan",
      "Yokohama, Japan",
      "Seoul, South Korea",
      "Busan, South Korea",
      "Jakarta, Indonesia",
      "Surabaya, Indonesia",
      "Dubai, United Arab Emirates",
      "Abu Dhabi, United Arab Emirates",
      "Istanbul, Turkey",
      "Ankara, Turkey",
      "Johannesburg, South Africa",
      "Cape Town, South Africa",
      "Durban, South Africa",
      "Lagos, Nigeria",
      "Abuja, Nigeria",
      "Cairo, Egypt",
      "Alexandria, Egypt",
      "Nairobi, Kenya",
      "Mombasa, Kenya",
      "Sydney, Australia",
      "Melbourne, Australia",
      "Brisbane, Australia",
      "Auckland, New Zealand",
      "Wellington, New Zealand",
    ];
    const cityOptions = cities.map((city) => ({
      value: `${city}`,
      lable: `${city.split(",")[0]}`,
    }));
    setCities(cityOptions);
    let dates = [
      {
        value: new Date().toLocaleDateString("en-UK"),
        lable: new Date().toLocaleDateString("en-UK"),
      },
    ];
    let today = new Date();
    for (let i = 0; i < 5; i++) {
      today.setDate(today.getDate() + 1);
      dates.push({
        value: today.toLocaleDateString("en-UK"),
        lable: today.toLocaleDateString("en-UK"),
      });
    }
    setDates(dates);
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: "#29C5F6",
            optionSelectedColor: "rgb(255, 255, 255)",
          },
        },
      }}
    >
      <div className="filters">
        <Select
          allowClear
          onClear={() => dispatch(setSelectedCity(null))}
          showSearch
          onChange={(value) => dispatch(setSelectedCity(value))}
          options={cities}
          placeholder="Select City"
        />
        <div className="date-selecter">
          <p style={{ color: "white" }}>Select Date:</p>
          <Select
            placeholder="Select Date"
            options={dates}
            onChange={(value) => dispatch(setDateFilterForecast(value))}
            defaultValue={new Date().toLocaleDateString("en-UK")}
            // onClear={() =>
            //   setDateFilterForecast(new Date().toLocaleDateString("en-UK"))
            // }
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
