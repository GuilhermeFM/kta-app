﻿using System.Threading.Tasks;

namespace kta.email
{
    public interface IEmail
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
