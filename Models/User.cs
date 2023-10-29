
using System.ComponentModel.DataAnnotations;

namespace BossAutoBlackEdition.Models
{
    public class User
    {
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
