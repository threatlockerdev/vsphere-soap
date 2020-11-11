import json
import sys
from pyVmomi import CoreTypes, QueryTypes, ServerObjects, VmomiSupport

def main():
  if len(sys.argv) < 2:
    print("Usage: python -m scripts.generate <filename>")
    return
  VmomiSupport.populateVersions()
  [outputFilename] = sys.argv[1:]
  handle = open(outputFilename, "w")
  handle.write(json.dumps({
    "breakingChanges": VmomiSupport.breakingChanges,
    "dataTypes": VmomiSupport.dataTypes,
    "enumTypes": VmomiSupport.enumTypes,
    "managedTypes": VmomiSupport.managedTypes,
    "versions": VmomiSupport.versions
  }))
  handle.close()

if __name__ == "__main__":
  main()
