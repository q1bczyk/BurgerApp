using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class DayOff
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [MaxLength(36)] 
    public string Id { get; set; }
    public string Date { get; set; }
    public List<Local> Locals { get; set; } = new();
    public List<DayOffLocal> DayOffLocals { get; set; } = new();
}