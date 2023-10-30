namespace api.models
{
    public class Exercise
    {
        public int Id {get; set;}
        public string ActivityType {get; set;}
        public int DistanceInMiles {get; set;}
        public string DateCompleted {get; set;}
        public bool Pinned {get; set;}
        public bool Deleted {get; set;}

        public override string ToString() 
        {
                return $"Activity ID: {Id}\n" +
                $"Activity Type: {ActivityType}\n" +
                $"Distance: {DistanceInMiles} miles\n" +
                $"Date Completed: {DateCompleted}\n" +
                $"Pinned: {(Pinned ? "Yes" : "No")}\n" +
                $"Deleted: {(Deleted ? "Yes" : "No")}";
        }

    }
}