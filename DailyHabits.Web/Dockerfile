FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 62314
EXPOSE 44356

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY DailyHabits.Web/DailyHabits.Web.csproj DailyHabits.Web/
COPY DailyHabits.Model/DailyHabits.Model.csproj DailyHabits.Model/
COPY DailyHabits.Services/DailyHabits.Services.csproj DailyHabits.Services/
RUN dotnet restore DailyHabits.Web/DailyHabits.Web.csproj
COPY . .
WORKDIR /src/DailyHabits.Web
RUN dotnet build DailyHabits.Web.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish DailyHabits.Web.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "DailyHabits.Web.dll"]
