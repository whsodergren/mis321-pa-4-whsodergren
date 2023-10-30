using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using api.models;
using api.Database;
using Microsoft.AspNetCore.Cors;
using api.Models;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        // GET: api/Exercise
        [HttpGet]
        public IActionResult Get()
        {
            ReadExerciseData exerciseData = new ReadExerciseData();
            List<Exercise> exercises = exerciseData.GetAllExercises();
            return Ok(exercises);
        }

        // GET: api/Exercise/5
        [HttpGet("{id}", Name = "GetExercise")]
        public IActionResult Get(int id)
        {
            ReadExerciseData exerciseData = new ReadExerciseData();
            Exercise exercise = exerciseData.GetExercise(id);

            if (exercise == null)
            {
                return NotFound(); 
            }

            return Ok(exercise);
        }

        // POST: api/Exercise
        [HttpPost]
        public void Post([FromBody] Exercise value)
        {

                ConnectionString db = new ConnectionString();

                using var con = new MySqlConnection(db.cs);
                con.Open();

                using var cmd = new MySqlCommand();
                cmd.Connection = con;

                cmd.CommandText = @"INSERT INTO exercises(activityType, distanceInMiles, dateCompleted, pinned, deleted) 
                           VALUES(@activityType, @distanceInMiles, @dateCompleted, @pinned, @deleted)";

                cmd.Parameters.AddWithValue("@activityType", value.ActivityType);
                cmd.Parameters.AddWithValue("@distanceInMiles", value.DistanceInMiles);
                cmd.Parameters.AddWithValue("@dateCompleted", value.DateCompleted);
                cmd.Parameters.AddWithValue("@pinned", value.Pinned);
                cmd.Parameters.AddWithValue("@deleted", value.Deleted);

                cmd.ExecuteNonQuery();

                con.Close();

                System.Console.WriteLine(value.ActivityType);

              
        }



        // PUT: api/Exercise/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Exercise value) 
        {
            
            ConnectionString db = new ConnectionString();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE exercises SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = @id";
            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();

            con.Close();

            System.Console.WriteLine("Exercise with ID " + id + " marked as Pinned");
            
        }   



        // DELETE: api/Exercise/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            ConnectionString db = new ConnectionString();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE exercises SET deleted = 1 WHERE id = @id";
            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();

            con.Close();

            System.Console.WriteLine("Exercise with ID " + id + " marked as deleted");
        }
        
    }
}

