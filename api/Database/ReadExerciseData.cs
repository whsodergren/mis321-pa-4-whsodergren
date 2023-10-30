using System.Data.Common;
using api.Interfaces;
using api.models;
using api.Models;
using MySql.Data.MySqlClient;

namespace api.Database
{
    public class ReadExerciseData : IGetExercise, IGetAllExercises
    {
       
        public List<Exercise> GetAllExercises() 
        {
            List<Exercise> exercises = new List<Exercise>();

            ConnectionString db = new ConnectionString();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "SELECT * FROM exercises;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read()) {
                Exercise exercise = new Exercise {
                Id = rdr.GetInt32(0),
                ActivityType = rdr.GetString(1),
                DistanceInMiles = rdr.GetInt32(2),
                DateCompleted = rdr.GetString(3),
                Pinned = rdr.GetBoolean(4),
                Deleted = rdr.GetBoolean(5)
            };

            exercises.Add(exercise);
            }

            con.Close();

            return exercises;
        }


        public Exercise GetExercise(int id) 
        {
            Exercise exercise = null;

            ConnectionString db = new ConnectionString();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "SELECT * FROM exercises WHERE Id = @ExerciseId;";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ExerciseId", id);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            if (rdr.Read()) {
                exercise = new Exercise {
                Id = rdr.GetInt32(0),
                ActivityType = rdr.GetString(1),
                DistanceInMiles = rdr.GetInt32(2),
                DateCompleted = rdr.GetString(3),
                Pinned = rdr.GetBoolean(4),
                Deleted = rdr.GetBoolean(5)
                };
            }

        con.Close();

        return exercise;
        }

    }
}