import { LoginContext } from '@/context/LoginContext';
import { days } from '@/utils/days';
import { timeMapping } from '@/utils/mappingTme';
import { useContext, useEffect, useState } from 'react';

function TableContent() {
  const { newToken } = useContext(LoginContext);
  const [mappingData, setMappingData] = useState([]);

  const rowStyling =
    'w-[140px] h-[80px] text-center border-[1px] border-[#D9D9D9]';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          'https://hiring-test-task.vercel.app/api/appointments',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const appointmentsData = await response.json();
          const shappingDataOne = Object.values(appointmentsData);
          const shappingDataTwo = shappingDataOne.slice(
            0,
            shappingDataOne.length - 2
          );
          const result = shappingDataTwo.slice(0).map((item) => {
            const left = days.indexOf(item.weekDay) * 143 + 'px';
            const startTimeTop = timeMapping[item.startTimeFormatted];
            const endTimeTop = timeMapping[item.endTimeFormatted];
            const height = endTimeTop - startTimeTop + 'px';

            return {
              name: item.name,
              reason: item.reason,
              left: left,
              top: startTimeTop + 'px',
              height: height,
            };
          });
          setMappingData(result);
        } else {
          console.error('Error fetching appointments:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchAppointments();
  }, []);

  if (mappingData.length === 0) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="overflow-x-auto mt-6 mx-[60px] border-[1px] border-[#704040] rounded-t-[16px] rounded-bl-[16px] m-2">
      <table className="min-w-full bg-white w-[1120px] table-fixed border-collapse">
        <thead>
          <tr>
            <th className={rowStyling}>Time</th>
            {days.map((elem) => (
              <th className={rowStyling} key={elem}>
                {elem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="relative">
          {mappingData.map((elem) => (
            <tr
              key={elem.name}
              className={`rounded-md absolute w-[140px] cursor-pointer`}
              style={{
                height: elem.height,
                left: elem.left,
                top: elem.top,
                backgroundColor: 'rgba(191, 219, 254, 0.7)',
              }}
            >
              <td className="py-2">
                <div className="text-center">
                  <p className="font-bold">{elem.name}</p>
                  <p className="text-[12px] px-4">{elem.reason}</p>
                </div>
              </td>
            </tr>
          ))}
          {Array.from({ length: 24 }).map((_, rowIndex) => {
            const hour = (rowIndex % 12) + 1;
            const amOrPm = rowIndex < 12 ? 'AM' : 'PM';

            return (
              <tr key={rowIndex}>
                <td className={rowStyling}>{`${hour} ${amOrPm}`}</td>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  return <td key={dayIndex} className={rowStyling} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableContent;
