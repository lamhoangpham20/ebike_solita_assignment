
const averageStationQuery = `SELECT AVG(journey.cover_distance)
        FROM station
        LEFT JOIN journey
        ON station.id = journey.departure_station_id
        where station.id = $1
        GROUP BY station.id UNION SELECT AVG(journey.cover_distance)
        FROM station
        LEFT JOIN journey
        ON station.id = journey.return_station_id
        where station.id = $1
        GROUP BY station.id `;

const ReturnTopStations = `Select return_station_id, count, station.name from(
          SELECT journey.return_station_id, Count(journey.return_station_id)
          FROM station
          LEFT JOIN journey
          ON station.id = journey.departure_station_id 
          Where journey.departure_station_id =$1
          Group By journey.departure_station_id, station.id, journey.return_station_id 
          ORDER By Count(journey.return_station_id) DESC limit 5
          ) as foo 
          Left Join station on station.id = foo.return_station_id
          Order By count desc;`;

const DepartTopStations = `Select departure_station_id, count, station.name from(
          SELECT journey.departure_station_id, Count(journey.departure_station_id)
          FROM station
          LEFT JOIN journey
          ON station.id = journey.return_station_id 
          Where journey.return_station_id =$1
          Group By journey.return_station_id, station.id, journey.departure_station_id 
          ORDER By Count(journey.departure_station_id) DESC limit 5
          ) as foo 
          Left Join station on station.id = foo.departure_station_id
          Order By count desc;`;

export { averageStationQuery, ReturnTopStations, DepartTopStations };
