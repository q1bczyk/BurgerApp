using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Local
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [MaxLength(36)] 
    public string Id { get; set; }
    public string Name { get; set; }
    public Admin? Admin { get; set; }
    public Contact? Contact { get; set; }
    public List<OpeningHour> OpeningHours { get; set; } = new();
    public List<OpeningHourLocal> OpeningHourLocals { get; set; } = new();
    public List<DayOff> DayOffs { get; set; } = new();
    public List<DayOffLocal> DayOffLocals { get; set; } = new();

}