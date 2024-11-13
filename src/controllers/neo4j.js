// neo4j.js
import neo4j from "neo4j-driver";

// Neo4j connection details
const driver = neo4j.driver(
  "neo4j+s://cc09db94.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "H5ljS9ozkP5u_IZL7RJhNS-svqi7OEdExo7AHGsZEM0") // Credentials
);

const getRecommendedMovies = async (id) => {
  const session = driver.session();
  const query = `
      MATCH (m:Movie {id: $id})-[:HAS_GENRE|HAS_CAST|HAS_DIRECTOR]->(f)
      WITH m, f
      MATCH (other:Movie)-[:HAS_GENRE|HAS_CAST|HAS_DIRECTOR]->(f)
      WHERE other <> m
      WITH other,
           COUNT(CASE WHEN (f:Genre) THEN 1 END) AS genre_count,
           COUNT(CASE WHEN (f:Actor) THEN 1 END) AS actor_count,
           COUNT(CASE WHEN (f:Director) THEN 1 END) AS director_count
      RETURN other.title AS RecommendedMovie,
             other.id AS Id,
             (genre_count * 1.0 + actor_count * 1.5 + director_count * 2.0) AS score
      ORDER BY score DESC
      LIMIT 10
    `;

  try {
    const result = await session.run(query, { id });
    console.log(result.records);
    const recommendedMovies = result.records.map((record) => ({
      title: record.get("RecommendedMovie"),
      id: record.get("Id"),
    }));

    console.log("Recommended Movies:", recommendedMovies); // Check the output
    return recommendedMovies;
  } catch (error) {
    console.error("Error executing Neo4j query:", error);
    return [];
  } finally {
    await session.close();
  }
};

// Clean up the driver
const closeConnection = () => {
  driver.close();
};

export default getRecommendedMovies;
