{
    description = "Optional development shell for template-svelte";

    inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    outputs =
        { nixpkgs, ... }:
        let
            systems = [
                "x86_64-linux"
                "aarch64-linux"
                "aarch64-darwin"
            ];
        in
        {
            devShells = nixpkgs.lib.genAttrs systems (
                system:
                let
                    pkgs = import nixpkgs { inherit system; };
                in
                {
                    default = pkgs.mkShellNoCC (
                        {
                            packages = [
                                pkgs.git
                                pkgs.prek
                                pkgs.nodejs-slim_latest
                                pkgs.pnpm
                            ]
                            ++ pkgs.lib.optionals pkgs.stdenv.hostPlatform.isLinux [ pkgs.chromium ];
                        }
                        // pkgs.lib.optionalAttrs pkgs.stdenv.hostPlatform.isLinux {
                            PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = "${pkgs.chromium}/bin/chromium";
                            PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
                        }
                    );
                }
            );
        };
}
