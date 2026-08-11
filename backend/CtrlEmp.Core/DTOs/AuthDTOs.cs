using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.DTOs
{
    public record LoginDto(string Username, string Password);

    public record RegisterDto(string Username, string Password, string Role);

    public record AuthResponseDto(string Token, string Username, string Role);
}
