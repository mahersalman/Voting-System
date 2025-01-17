export const createBallotAPI = [
    'function createBallot(string memory _title, string memory _description, uint256 _start_date, uint256 _end_data, string[] memory _candidateList, address[] memory _voters) public',
    'function getBallots() public view returns (address[] memory)',
    'function ballotContractsAddresses(uint256 index) public view returns (address)'
  ];
export const ballotAPI = [
    'function vote(string memory _candidate) public',
    'function getBallotDetails() public view returns (string[] memory)',
    'function getResults() public view returns (string[] memory, uint256[] memory)',
    // Public variables
    'function title() public view returns (string)',
    'function description() public view returns (string)',
    'function start_date() public view returns (uint256)',
    'function end_date() public view returns (uint256)',
    'function candidateList(uint256 index) public view returns (string)',
    'function results(string memory _candidate) public view returns (uint256)',
    'function Voters(address voter) public view returns (bool)'
  ];