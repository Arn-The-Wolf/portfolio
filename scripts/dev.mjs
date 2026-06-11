import { execSync, spawn } from "child_process"
import { createRequire } from "module"
import { platform } from "os"

const require = createRequire(import.meta.url)
const nextBin = require.resolve("next/dist/bin/next")
const PORT = 3000

function killPort(port) {
  if (platform() === "win32") {
    try {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" })
      const pids = new Set()
      for (const line of output.split("\n")) {
        if (!line.includes("LISTENING")) continue
        const parts = line.trim().split(/\s+/)
        const pid = parts[parts.length - 1]
        if (pid && pid !== "0") pids.add(pid)
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" })
          console.log(`Freed port ${port} (PID ${pid})`)
        } catch {
          // process may already be gone
        }
      }
    } catch {
      // nothing listening
    }
    return
  }

  try {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" })
  } catch {
    // nothing listening
  }
}

killPort(PORT)

const child = spawn(process.execPath, [nextBin, "dev", "-p", String(PORT)], {
  stdio: "inherit",
})

child.on("exit", (code) => process.exit(code ?? 0))
