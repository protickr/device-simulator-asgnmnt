<?php

use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
    web: __DIR__ . '/../routes/web.php',
    api: __DIR__ . '/../routes/api.php',
    commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
    $middleware->appendToGroup('api', ForceJsonResponse::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->render(function (Throwable $e, Request $request): ?JsonResponse {
        if (! $request->expectsJson()) {
            return null;
        }

        if ($e instanceof ValidationException) {
            return response()->json([
                'error' => [
                    'code' => $e->status,
                    'message' => 'Validation failed.',
                    'details' => $e->errors(),
                ],
            ], $e->status);
        }

        if ($e instanceof ModelNotFoundException) {
            return response()->json([
                'error' => [
                    'code' => Response::HTTP_NOT_FOUND,
                    'message' => 'Resource not found.',
                ],
            ], Response::HTTP_NOT_FOUND);
        }

        if ($e instanceof HttpExceptionInterface) {
            $status = $e->getStatusCode();
            $message = $e->getMessage() ?: Response::$statusTexts[$status] ?? 'HTTP error';

            return response()->json([
                'error' => [
                    'code' => $status,
                    'message' => $message,
                ],
            ], $status, $e->getHeaders());
        }

        $status = Response::HTTP_INTERNAL_SERVER_ERROR;

        return response()->json([
            'error' => [
                'code' => $status,
                'message' => config('app.debug')
                    ? $e->getMessage()
                    : 'Something went wrong. Please try again later.',
            ],
        ], $status);
    });
    })->create();
