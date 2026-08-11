using CtrlEmp.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace CtrlEmp.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> LoginAsync(LoginDto dto);
        Task<bool> RegisterAsync(RegisterDto dto);
    }
}
