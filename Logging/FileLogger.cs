using ExapleMvcApplication.Logging;
using Microsoft.Extensions.FileProviders;

namespace ExapleMvcApplication.Logging
{
    public class FileLogger : ILogger, IDisposable
    {
        private readonly string path;
        private object SyncObj = new object();
        public FileLogger(string path)
        {
            this.path = path;
        }
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull
        {
            return this;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            lock (SyncObj)
            { 
                using StreamWriter writer = new(path, true);
                writer.WriteLine(formatter(state, exception));
            }
        }
        public void Dispose() { }
    }
}
public class FileLoggerProvider : ILoggerProvider
{
    string path;
    public FileLoggerProvider(string path)
    {
        this.path = path;
    }
    public ILogger CreateLogger(string categoryName)
    {
        return new FileLogger(path);
    }

    public void Dispose() { }
}
public static class FileLoggerExtensions
{
    public static ILoggingBuilder AddFile(this ILoggingBuilder builder, string filePath)
    {
        builder.AddProvider(new FileLoggerProvider(filePath));
        return builder;
    }
}