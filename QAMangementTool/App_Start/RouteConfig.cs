using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace QAMangementTool
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
               name: "TaskMngDefault",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "taskMng", action = "taskMngDefault", id = UrlParameter.Optional }
           );

            routes.MapRoute(
               name: "ResourcesMngDefault",
               url: "Views/{controller}/{action}",
               defaults: new { controller = "ResourcesMng", action = "ResourcesMngDefault", id = UrlParameter.Optional }
           );

            routes.MapRoute(
              name: "PersonalOfficeDefault",
              url: "Views/{controller}/{action}",
              defaults: new { controller = "PersonalOffice", action = "PersonalOfficeDefault", id = UrlParameter.Optional }
          );
        }
    }
}