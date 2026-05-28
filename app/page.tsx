"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [stage, setStage] =
    useState("");

  const [
    selectedProvider,
    setSelectedProvider,
  ] = useState("groq");

  async function handleGenerate() {
    try {
      setLoading(true);

      setResult(null);

      setStage(
        "Extracting intent..."
      );

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 700)
      );

      setStage(
        "Generating schema..."
      );

      const response =
        await fetch(
          "/api/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              prompt,
              provider:
                selectedProvider,
            }),
          }
        );

      setStage(
        "Generating application spec..."
      );

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 700)
      );

      setStage(
        "Building workflows..."
      );

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 700)
      );

      setStage(
        "Finalizing orchestration..."
      );

      const data =
        await response.json();

      setStage("Completed");

      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {

      setTimeout(() => {
        setStage("");
      }, 2000);

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-5xl font-bold">
            Multi-Agent AI Orchestration Engine
          </h1>

          <p className="text-gray-400 mt-2">
            AI-native application specification pipeline
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(
                e.target.value
              )
            }
            placeholder="Describe the app you want to build..."
            className="w-full h-40 bg-black border border-zinc-700 rounded-lg p-4 text-white"
          />

          <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-400">
              Select AI Provider
            </label>

            <select
              value={
                selectedProvider
              }
              onChange={(e) =>
                setSelectedProvider(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white"
            >
              <option value="groq">
                Groq
              </option>

              <option value="gemini">
                Gemini
              </option>

              <option value="openrouter">
                OpenRouter
              </option>
            </select>
          </div>

          <button
            onClick={
              handleGenerate
            }
            disabled={loading}
            className="mt-4 bg-white text-black px-6 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Generating..."
              : "Generate AppSpec"}
          </button>

          {stage && (
            <div className="mt-4 text-blue-400 font-medium">
              {stage}
            </div>
          )}

        </div>

        {result && (
          <div className="space-y-8">

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4">
                Intent
              </h2>

              <div className="space-y-2">
                <p>
                  <strong>App:</strong>{" "}
                  {
                    result.intent
                      ?.appName
                  }
                </p>

                <p>
                  <strong>Type:</strong>{" "}
                  {
                    result.intent
                      ?.appType
                  }
                </p>

                <p>
                  <strong>Features:</strong>{" "}
                  {result.intent?.features?.join(
                    ", "
                  )}
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4">
                Database Schema
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.schema?.entities?.map(
                  (
                    entity: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-lg p-4"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {
                          entity.name
                        }
                      </h3>

                      <div className="space-y-1">
                        {entity.fields?.map(
                          (
                            field: any,
                            i: number
                          ) => (
                            <div
                              key={i}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {
                                  field.name
                                }
                              </span>

                              <span className="text-gray-400">
                                {
                                  field.type
                                }
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4">
                API Endpoints
              </h2>

              <div className="space-y-3">
                {result.appSpec?.apiEndpoints?.map(
                  (
                    endpoint: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-lg p-4 flex justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          {
                            endpoint.path
                          }
                        </p>

                        <p className="text-gray-400 text-sm">
                          {
                            endpoint.description
                          }
                        </p>
                      </div>

                      <div className="text-green-400">
                        {
                          endpoint.method
                        }
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4">
                Workflow Automations
              </h2>

              <div className="space-y-3">
                {result.workflowStubs?.map(
                  (
                    workflow: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-lg p-4"
                    >
                      <p className="font-semibold">
                        {
                          workflow.name
                        }
                      </p>

                      <p className="text-sm text-gray-400">
                        {
                          workflow.description
                        }
                      </p>

                      <div className="mt-2 text-xs text-green-400">
                        {
                          workflow.integration
                        }{" "}
                        →
                        {" "}
                        {
                          workflow.action
                        }
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

