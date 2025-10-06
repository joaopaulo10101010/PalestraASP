﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PalestraPalestrante.Authenticacao;


namespace WebApplication3.Authenticacao
{
    public class SessionAuthorizeAttribute : ActionFilterAttribute
    {
        public string? RoleAnyOf { get; set; } // CSV ex: "Adm,Bibliotecario" 

        public override void OnActionExecuting(ActionExecutingContext context)

        {

            var http = context.HttpContext;

            var role = http.Session.GetString(SessionKeys.cargo_usuario);

            var userId = http.Session.GetInt32(SessionKeys.cpf_usuario);

            if (userId == null)

            {

                context.Result = new RedirectToActionResult("Login", "Auth", null);

                return;

            }

            if (!string.IsNullOrWhiteSpace(RoleAnyOf))

            {

                var allowed = RoleAnyOf.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

                if (!allowed.Contains(role))

                {

                    context.Result = new RedirectToActionResult("AcessoNegado", "Auth", null);

                    return;

                }

            }

            base.OnActionExecuting(context);

        }
    }
}