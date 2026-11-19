# Content and media provenance

This website deliberately features only the MSRA server-handling project.
The home page contains a short biography, one linked research feature, and education.

## Evidence and attribution

- The user's undergraduate thesis and defense presentation support the lift, end-effector, height-control, and contact-analysis descriptions.
- The thesis reports handling success below 50% before the adjustment and above 90% afterward. The poster summarizes the final result as 90%. The website conservatively uses approximately 90% and limits the claim to the evaluated setup at the same rack height. No sample count is invented.
- The shared project's calibration and vision pipeline is documented in `robot_dc/doc/handeye_calibration.md`, `robot_dc/doc/rack_calibration.md`, and the `robot_vision` submodule. These features are described as system methods. Personal ownership is confined to the responsibilities stated in the CV/thesis and confirmed in conversation.
- Transform notation is explicitly defined: T_AB maps frame B into frame A. Thus T_BC(q) = T_BE(q) T_EC and T_BG = T_BR T_RG.
- The use of rigid transforms, calibrated geometry, and registration provides the more formal explanation requested in relation to CIS/RDKDC. No new calibration algorithm or historical implementation is attributed to those courses.
- FlowFormer++ supplies optical-flow correspondences. This is not a claim of generative Flow Matching or of developing/training the original model.
- The force-guided lift method is described as support-height adjustment and threshold actions, not as a full impedance controller or a new hybrid force/position controller.

## Video

Source: `结题答辩.pptx`, slide 26, embedded `ppt/media/media1.mp4`.
The extracted original stays outside this Git checkout, under `../review/ppt-defense/`.

Original: approximately 3 min 15 s, 3840 × 2160, 30 fps, HEVC Main 10 (hvc1), AAC audio.
At the user's request, the video is **not recompressed**. MP4 segments are created with FFmpeg stream copy (`-c copy`), with the original video and audio streams retained. MP4 metadata is moved to the front for playback. Each segment stays below GitHub's 100 MiB single-file ceiling, and `demo.js` advances through them in order. Small loading pauses can occur at boundaries. A timestamp selector provides navigation across the full demo.

The HEVC codec is preserved to avoid quality loss. Browser playback depends on HEVC decoder support; the player provides a download link when decoding fails. No unapproved lower-quality fallback is generated.

Images are extracted from the project poster originally supplied in this workspace. The video poster is a frame extracted from the demo. These are actual project images, not generated illustrations.

## Local preview

Serve this directory with a static HTTP server. Use HTTP rather than opening HTML directly so `fetch` can read the video manifest. The server should support byte range requests for efficient video seeking.
